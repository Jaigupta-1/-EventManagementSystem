// models/index.js
import sequelize from "../config/database.js";
import Admin from "./admin.js";
import Organizer from "./organizer.js";
import Event from "./event.js";
import User from "./user.js";
import Registration from "./registrations.js";

// Initialize db object
sequelize.db = {};

// Initialize models
sequelize.db.Admin = Admin.init(sequelize);
sequelize.db.Organizer = Organizer.init(sequelize);
sequelize.db.Event = Event.init(sequelize);
sequelize.db.User = User.init(sequelize);
sequelize.db.Registration = Registration.init(sequelize);

// Setup associations if any
Admin.associate?.(sequelize.db);
Organizer.associate?.(sequelize.db);
Event.associate?.(sequelize.db);
User.associate?.(sequelize.db);
Registration.associate?.(sequelize.db);

// Test connection
sequelize.authenticate()
  .then(() => console.log("DB is Connected!"))
  .catch(e => console.log(e));

// Sync tables (optional)
// sequelize.sync({ alter: true })
//   .then(() => console.log("Tables synced"))
//   .catch(e => console.log(e));

export default sequelize;
