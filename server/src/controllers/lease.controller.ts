import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLeases = async (req: Request, res: Response): Promise<void> => {
  try {
    const leases = await prisma.lease.findMany({
      include: {
        tenant: true,
        property: true,
      },
    });
    res.status(200).json(leases);
  } catch (error: any) {
    console.error("Error retrieving leases:", error);
    res
      .status(500)
      .json({ message: `Error retrieving leases: ${error.message}` });
  }
};

export const getLeasesPayments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const payments = await prisma.payment.findMany({
      where: {
        leaseId: Number(id),
      },
    });
    res.status(200).json(payments);
  } catch (error: any) {
    console.error("Error retrieving payments:", error);
    res
      .status(500)
      .json({ message: `Error retrieving payments: ${error.message}` });
  }
};
