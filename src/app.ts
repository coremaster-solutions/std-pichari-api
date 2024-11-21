import { jobsProvider } from "./shared/infrastructure/containers";
import { SocketProvider } from "./shared/infrastructure/containers/providers/SocketProvider";
import { Server } from "./shared/infrastructure/http";

const server = new Server();

export const socket = new SocketProvider(server.HttpServer);

jobsProvider.process();

setInterval(() => {
  const hourTimeZone = new Date().toLocaleTimeString([], {
    timeZone: "America/Lima",
    hour: "numeric",
    hour12: false,
  });
  const minuteTimeZone = new Date().toLocaleTimeString([], {
    timeZone: "America/Lima",
    minute: "numeric",
    hour12: false,
  });
  const isOneHourToMidNight =
    Number(hourTimeZone) == 24 && Number(minuteTimeZone) <= 2;
  console.log(
    new Date().toLocaleTimeString([], {
      timeZone: "America/Lima",
    }),
    "HOUR timeZone::" +
      new Date().toLocaleTimeString([], {
        timeZone: "America/Lima",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }),
    "isMidNight::: " + isOneHourToMidNight
  );

  if (isOneHourToMidNight) {
    jobsProvider.add({
      type: "clean_temp_directory",
      data: null,
    });
  }
}, 1000 * 30);

server.listen();

export default server;
