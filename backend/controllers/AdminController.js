const { getSupabase } = require("../DataBase/DBConnection");

exports.getAdminName = (req, res, next) => {
  res.json({
    name: "admin",
  });
};

exports.addSection = async (req, res, next) => {
  const { section } = req.body;
  const { data, error } = await getSupabase()
    .from("Sections")
    .insert({ section: section });
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ message: "Section added successfully!" });
  }
};

exports.getReports = async (req, res, next) => {
  let { data: reports, error } = await getSupabase()
    .from("Reports")
    .select("*");
  if (error) {
    // Return an error if there was a problem retrieving the products
    res.status(500).send({Message: error});
  } else {
    // Return the list of products in JSON format
    res.status(200).json(reports);
  }
};
exports.getStats = async (req, res, next) => {
  try {
    const productCount = await productsCounter();
    const usersCount = await usersCounter();
    const businessOwnersCount = await businessOwnersCounter();
    const reportsCount = await reportsCounter();
    const stats = new statistics(
      usersCount,
      reportsCount,
      businessOwnersCount,
      productCount
    );
    res.status(200).json(stats);
  } catch (error) {
    res.status(400).json({Message: error.message});
  }
};

class statistics {
  constructor(users, reports, businessOwners, products) {
    this.users = users;
    this.reports = reports;
    this.businessOwners = businessOwners;
    this.products = products;
  }
}
async function productsCounter() {
  let { data, count } = await getSupabase()
    .from("Product")
    .select("*", { count: "exact" });

  console.log(count);
  return count;
}
async function usersCounter() {
  let { data, count } = await getSupabase()
    .from("Person")
    .select("*", { count: "exact" })
    .eq("Flag_IsBusinessOwner", "FALSE");

  console.log(count);
  return count;
}

async function businessOwnersCounter() {
  let { data, count } = await getSupabase()
    .from("Person")
    .select("*", { count: "exact" })
    .eq("Flag_IsBusinessOwner", "TRUE");

  console.log(count);
  return count;
}
async function reportsCounter() {
  let { data, count } = await getSupabase()
    .from("Reports")
    .select("*", { count: "exact" });

  console.log(count);
  return count;
}

exports.getSpecificReport = async (req, res, next) => {
  const report_id = req.params.id;
  const { data, error } = await getSupabase()
    .from("Reports")
    .select("*")
    .eq("id", report_id);
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};
