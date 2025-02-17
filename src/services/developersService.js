const DevelopersModel = require("../models/developers");

const DevelopersService = {
  registerDeveloper: async ({ email, name, apiKey, password }) => {
    // Check if the email is already registered
    const existingDeveloper = await DevelopersModel.getDeveloperByEmail(email);
    if (existingDeveloper) {
      throw new Error("Developer with this email already exists");
    }

    // Generate API key if not provided
    const finalApiKey = apiKey || `apiKey-${Date.now()}`;

    return await DevelopersModel.createDeveloper({
      email,
      name,
      apiKey: finalApiKey,
      password,
    });
  },
  getDeveloperDetails: async (email) => {
    return await DevelopersModel.getDeveloperByEmail(email);
  },

  getApplicationsByDeveloper: async (email) => {
    return await DevelopersModel.fetchApplicationsByDeveloper(email);
  },

  getAllDevelopers: async () => {
    return await DevelopersModel.getAllDevelopers();
  },

  authenticateDeveloper: async (email, password) => {
    const developer = await DevelopersModel.getDeveloperByEmail(email);
    if (password === developer.password) {
        return developer;
    }
    return null;
},

getDeveloperApplications: async (email) => {
    return await DevelopersModel.fetchApplicationsByDeveloper(email);
  },
  
  deleteDeveloperApplications: async (email) => {
    return await DevelopersModel.deleteDeveloperApplications(email);
  },
};

module.exports = DevelopersService;
