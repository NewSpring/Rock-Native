using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GraphQL;
using GraphQL.Http;
using GraphQL.Instrumentation;
using GraphQL.Types;
using GraphQL.Validation.Complexity;

namespace WebApplicationBasic.Controllers
{
    [Route("graphql")]
    public class GraphQLController : Controller
    {
        private readonly IDocumentExecuter _executer;
        private readonly IDocumentWriter _writer;
        private readonly IDictionary<string, string> _namedQueries;
        
        public GraphQLController(
            IDocumentExecuter executer,
            IDocumentWriter writer)
        {
            _executer = executer;
            _writer = writer;

            _namedQueries = new Dictionary<string, string>
            {
                ["a-query"] = @"query foo { hero { name } }"
            };
        }



        [HttpPost]
        public async Task<HttpResponseMessage> PostAsync(HttpRequestMessage request, GraphQLQuery query)
        {
            var inputs = query.Variables.ToInputs();
            var queryToExecute = query.Query;

            if (!string.IsNullOrWhiteSpace(query.NamedQuery))
            {
                queryToExecute = _namedQueries[query.NamedQuery];
            }

            var result = await _executer.ExecuteAsync(_ =>
            {
                _.Schema = new SampleSchema();
                _.Query = queryToExecute;
                _.OperationName = query.OperationName;
                _.Inputs = inputs;

                _.ComplexityConfiguration = new ComplexityConfiguration { MaxDepth = 15 };
                _.FieldMiddleware.Use<InstrumentFieldsMiddleware>();

            }).ConfigureAwait(false);

            var httpResult = result.Errors?.Count > 0
                ? HttpStatusCode.BadRequest
                : HttpStatusCode.OK;

            var json = _writer.Write(result);

            var response = new HttpResponseMessage(httpResult);
            response.Content = new StringContent(json, Encoding.UTF8, "application/json");

            return response;
        }

        public class SampleSchema : Schema
        {
            public SampleSchema()
            {
                Query = new StarWarsQuery();
            }
        }

        public class GraphQLQuery
        {
            public string OperationName { get; set; }
            public string NamedQuery { get; set; }
            public string Query { get; set; }
            public string Variables { get; set; }
        }

        public class Droid
        {
            public string Id { get; set; }
            public string Name { get; set; }
        }

        public class DroidType : ObjectGraphType<Droid>
        {
            public DroidType()
            {
                Field(x => x.Id).Description("The Id of the Droid.");
                Field(x => x.Name, nullable: true).Description("The name of the Droid.");
            }
        }

        public class StarWarsQuery : ObjectGraphType
        {
            public StarWarsQuery()
            {
                Field<DroidType>(
                    "hero",
                    resolve: context => new Droid { Id = "1", Name = "R2-D2" }
                );
            }
        }

    }
}
