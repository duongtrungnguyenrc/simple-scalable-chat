import { INestApplication, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory, Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import * as passport from "passport";

import { getSessionMiddleware } from "@common/middlewares";
import { ChatSocketAdapter } from "@modules/chat";
import { AuthGuard } from "@modules/auth";
import { AppModule } from "@modules/app";

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const reflector: Reflector = app.get(Reflector);
  const sessionMiddleware = getSessionMiddleware(configService);

  app.enableCors({
    origin: [configService.get<string>("CLIENT_IP_ORIGIN"), configService.get<string>("CLIENT_ORIGIN")],
    credentials: true,
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
