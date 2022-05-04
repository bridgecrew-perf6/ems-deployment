import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

module.exports = 
    {
        Query: {
            // waste: async () => await prisma.waste.findMany(),
            waste: async () => await prisma.waste.findMany({
                where: {
                    deleted: false
                }
            }),
        },
        Mutation: {
            upsertWaste: async (root, args, context) => {
                let item = {}

                if(args.id){
                    item =  await prisma.waste.update({
                        where:{
                            id: args.id
                        },
                        data: {
                            name: args.name,
                            description: args.description
                        },
                      });
                }else{
                    item =  await prisma.waste.create({
                        data: {
                            name: args.name,
                            description: args.description
                        },
                      });
                }

                  return item;
            },
            deleteWaste: async (root, args, context) => {
              const item =  await prisma.waste.update({
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

