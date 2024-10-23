import { INestApplication, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory, Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import * as session from "express-session";
import * as passport from "passport";

import { AuthGuard } from "@modules/auth";
import { ChatSocketAdapter } from "@modules/chat";
import { AppModule } from "@modules/app";

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const reflector: Reflector = app.get(Reflector);

  const sessionMiddleware = session({
    secret: configService.get<string>("SESSION_SECRET"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: configService.get<string>("NODE_ENV") === "production",
      maxAge: 3600000,
    },
  });

  app.setGlobalPrefix("/api");
  app.useWebSocketAdapter(new ChatSocketAdapter(app, sessionMiddleware));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(reflector));

  app.use(sessionMiddleware);
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
