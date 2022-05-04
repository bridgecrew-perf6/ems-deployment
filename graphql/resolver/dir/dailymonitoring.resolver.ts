import { prisma } from "../../../lib/prisma";

module.exports = 
    {
        Query: {
            // dailyMonitoring: async () => await prisma.dailyMonitoring.findMany(),
            dailyMonitoring: async () => await prisma.dailyMonitoring.findMany({
                where: {
                    deleted: false
                }
            }),
            // mine
            dailyRecord: async (root,args,context) => await prisma.dailyMonitoring.findMany({
                where: {
                    id: args.id
                }
            }),
            dailyDateCheck: async (root,args,context) => await prisma.dailyMonitoring.findMany({
                where: {
                    inspection_date: args.inspection_date
                }
            })
        },
        Mutation: {
            upsertDailyMonitor: async (root, args, context) => {
                let item = {}

                if(args.id){
                    item =  await prisma.dailyMonitoring.update({
                        where:{
                            id: args.id
                        },
                        data: {
                            inspection_date: args.inspection_date,
                            census_count: args.census_count,
                            important_notes: args.important_notes
                        },
                      });
                }else{
                    item =  await prisma.dailyMonitoring.create({
                        data: {
                            inspection_date: args.inspection_date,
                            census_count: args.census_count,
                            important_notes: args.important_notes
                        },
                      });
                }

                  return item;
            },
            deleteDailyMonitor: async (root, args, context) => {
              const item =  await prisma.dailyMonitoring.update({
                  where: {
                      id: args.id
                  },
                  data: {
                      deleted: true
                  }
              })

              return item;
            } 
        }
    };

