import { prisma } from "../../../lib/prisma";

module.exports = 
    {
        Query: {
            // floor: async () => await prisma.floor.findMany(),
            floor: async () => await prisma.floor.findMany({
                where: {
                    deleted: false
                }
            }),
        },
        Mutation: {
            upsertFloor: async (root, args, context) => {
                let item = {}

                if(args.id){
                    item =  await prisma.floor.update({
                        where:{
                            id: args.id
                        },
                        data: {
                            num: args.num,
                            description: args.description
                        },
                      });
                }else{
                    item =  await prisma.floor.create({
                        data: {
                            num: args.num,
                            description: args.description
                        },
                      });
                }

                  return item;
            },
            deleteFloor: async (root, args, context) => {
              const item =  await prisma.floor.update({
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

