const jwt = require("jsonwebtoken");
const { getSupabase } = require("../DataBase/DBConnection");

exports.login = async (req, resp, next) => {
  let CurrentUser;
  const { Email, Password, logo } = req.body;
  const { data: user, error } = await getSupabase()
    .from("Person")
    .select("*")
    .eq("Email", Email)
    .eq("Password", Password)
    .single();
  if (!user) {
    resp.status(401).json({ message: "Invalid email or password" });
  } else if (error) {
    resp.status(500).json({ error: error.message });
  } else {
    const token = generateToken(user);
    let userType = "user";
    if (user.Email == "SAWOM_Team@gmail.com") {
      userType = "admin";
      CurrentUser = user.First_Name + " " + user.Last_Name;
    } else {
      if (user.Flag_IsBusinessOwner == true) {
        userType = "business owner";

        const { data: BO, error } = await getSupabase()
          .from("BusinessOwner")
          .select("*")
          .eq("Person_ID", user.Person_ID)
          .single();
        console.log(user.Person_ID);
        console.log(BO);
        CurrentUser = BO.Business_Name;
      } else {
        userType = "user";
        CurrentUser = user.First_Name + " " + user.Last_Name;
      }
    }
    return resp.status(200).json({
      message: "Logged in successfully",
      token: token,
      user_type: userType,
      logo: user.logo,
      user_name: CurrentUser,
      user_email: Email,
    });
  }
};

function generateToken(user) {
  const secret = "sawom-secret";
  const token = jwt.sign(
    {
      userId: user.Person_ID,
      email: user.Email,
      firstName: user.firstName,
      phone: user.PhoneNumber,
    },
    secret
  );
  return token;
}

exports.logout = async (req, res, next) => {
  try {
    const user = await getSupabase()
      .from("Person")
      .select("*")
      .eq("Person_ID", req.userId);
    if (!user) {
      return res.status(404).json({
        message: "Error No User found",
      });
    }
    req.userId = null;
    res.status(200).json({
      message: "Signed out successfully",
      userId: req.userId,
    });
  } catch (err) {
    console.log(err);
  }
};
