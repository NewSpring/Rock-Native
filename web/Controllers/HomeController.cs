using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;

namespace WebApplicationBasic.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index(
            [FromServices] IHostingEnvironment hostEnv,
            [FromServices] INodeServices nodeServices)
        {
            // Instead of using the asp-prerender-module tag helper, we'll invoke Prerenderer.RenderToString
            // in the controller so we can get additional info to pass to the view
            var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
            var unencodedPathAndQuery = requestFeature.RawTarget;
            var unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";
            var prerenderResult = await Prerenderer.RenderToString(
                hostEnv.ContentRootPath,
                nodeServices,
                new JavaScriptModuleExport("wwwroot/app/dist/main-server"),
                unencodedAbsoluteUrl,
                unencodedPathAndQuery,
                /* custom data parameter */ null,
                /* timeout milliseconds */ 15*1000,
                Request.PathBase.ToString()
            );

            ViewData["SpaHtml"] = prerenderResult.Html;
            ViewData["Meta"] = prerenderResult.Globals["meta"];
            ViewData["HtmlAttributes"] = prerenderResult.Globals["htmlAttributes"];
            ViewData["BodyAttributes"] = prerenderResult.Globals["bodyAttributes"];

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
