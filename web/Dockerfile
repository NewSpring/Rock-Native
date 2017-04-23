FROM microsoft/aspnetcore:1.1
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y build-essential nodejs
WORKDIR /app
ENV ASPNETCORE_URLS http://*:80
ENV ASPNETCORE_ENVIRONMENT Production
ENV NODE_ENV production
EXPOSE 80
COPY ./bin/Release/netcoreapp1.1/publish/ /app
ENTRYPOINT ["dotnet", "RockNative.dll"]
