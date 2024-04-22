import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    // const saltRounds = 10;
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password,hash) => {
    try {
        return await bcrypt.compare(password,hash);
    } catch (error) {
        console.log(error);
    }
}