const {mergeResolvers} = require("@graphql-tools/merge")
const {loadFilesSync} = require("@graphql-tools/load-files")
const path = require("path")

const noteResolver = require("./dir/notes.resolver") 
const linkResolver = require("./dir/links.resolver") 
const userResolver = require("./dir/user.resolver") 
const generatorResolver = require("./dir/generator.resolver") 
const floorResolver = require("./dir/floor.resolver") 
const pumpResolver = require("./dir/pump.resolver") 
const wasteResolver = require("./dir/waste.resolver")
const dailyMonitoringResolver = require("./dir/dailymonitoring.resolver")
const inspectionResolver = require("./dir/inspection.resolver")
const polutionControlResolver = require("./dir/polutioncontrol.resolver")
const unitResolver = require("./dir/unit.resolver");
const generatorStatusResolver = require("./dir/generatorstatus.resolver")
const powershiftReadingResolver = require("./dir/powershiftreading.resolver")
const pumpcheckResolver = require("./dir/pumpcheck.resolver")
const firepressureResolver = require("./dir/firepressure.resolver")
const pumpreadingResolver = require("./dir/pumpreading.resolver")

//  const resolversNew = loadFilesSync(path.join(__dirname, "./dir"));
//  const resolversNew = loadFilesSync(path.join(process.cwd(), "./**/*.resolver.*"));
//  const resolversNew = loadFilesSync(path.join(__dirname, "./dir/*.resolver.ts"));
//  const resolversNew = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));
// export const resolvers = mergeResolvers(resolversNew);
export const resolvers = mergeResolvers([
    polutionControlResolver,
    dailyMonitoringResolver,
    inspectionResolver,
    noteResolver, 
    linkResolver,
    userResolver,
    floorResolver,
    generatorResolver,
    pumpResolver,
    wasteResolver,
    unitResolver,
    generatorStatusResolver,
    powershiftReadingResolver,
    pumpcheckResolver,
    firepressureResolver,
    pumpreadingResolver
]);