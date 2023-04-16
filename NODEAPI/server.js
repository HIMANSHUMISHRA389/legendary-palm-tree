import {app} from "./app.js";
import { connectdb } from "./data/database.js";


connectdb();

app.listen(process.env.PORT||9000, () => {
  console.log(`server is statrted at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
