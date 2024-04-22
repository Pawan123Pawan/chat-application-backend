import { connect } from "mongoose";
import cli from 'cli-color';

const connectDB = async () => {
  try {
    const db = await connect(process.env.DB_URL);
    if(db){
        console.log(cli.blueBright("Connection is established"))
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
