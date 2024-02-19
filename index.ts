import * as dotenv from 'dotenv'
import { httpServer } from "./src/http_server";

dotenv.config()

const HTTP_PORT = process.env.HTTP_PORT ?? 8181;
const WS_PORT = process.env.WS_PORT ?? 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
console.log(`Start websocket server on the ${WS_PORT} port!`);
httpServer.listen(HTTP_PORT);
