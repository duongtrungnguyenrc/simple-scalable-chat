import { INestApplication, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import * as passport from "passport";

import { AppModule } from "./app";

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.setGlobalPrefix("/api");
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: configService.get<string>("SESSION_SECRET"),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: configService.get<string>("NODE_ENV") === "production",
        maxAge: 3600000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle("Chat example")
    .addServer("/")
    .setDescription("The chat API description")
    .setVersion("1.0")
    .addTag("chat")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, documentFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
