import { NextFunction, Request, Response } from 'express';
import { postNotification, getNotification } from './service';
import { AppError } from '@/utils';

export const postNotificationController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;

		if (!user) {
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);
		}

		const notifications = await postNotification(user._id);
		res.status(201).json({
			msg: 'ok',
			notifications,
		});
	} catch (error) {
		next(error);
	}
};

export const getNotificationController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		if (!user) {
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);
		}
		const notification = await getNotification(user._id);
		res.status(200).json({
			msg: 'ok',
			notification,
		});
	} catch (error) {
		next(error);
	}
};
