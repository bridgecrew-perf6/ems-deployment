import { prisma } from "../../../lib/prisma";

module.exports = 
    {
        Query: {
            // unit: async () => await prisma.unit.findMany(),
            unit: async () => await prisma.unit.findMany({
                where: {
                    deleted: false
                }
            })
        },
        Mutation: {
            upsertUnit: async (root, args, context) => {
                let item = {}

                if(args.id){
                    item =  await prisma.unit.update({
                        where:{
                            id: args.id
                        },
                        data: {
                          name: args.name,
                          description: args.description  
                        },
                      });
                }else{
                    item =  await prisma.unit.create({
                        data: {
                            name: args.name,
                            description: args.description  
                        },
                      });
                }

                  return item;
            },
            deleteFloor: async (root, args, context) => {
              const item =  await prisma.unit.update({
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

