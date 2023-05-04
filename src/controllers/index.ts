import { Request, Response } from 'express'

/**
 * GET /
 * Testing
 */
export const index = async (req: Request, res: Response): Promise<void> => {
  res.send('Hi Artemis!')
}
