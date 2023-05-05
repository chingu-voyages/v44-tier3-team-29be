import { NextFunction, Request, Response } from 'express'

type ServerError = Error & { status?: number }
export const errorHandler = (
  err: ServerError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res
    .status(err.status || 500)
    .send({ error: { title: err.name, message: err.message } })
}

export const errorNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res
    .status(404)
    .send({ error: { title: 'Page Not Found', message: 'Page Not Found' } })
}
