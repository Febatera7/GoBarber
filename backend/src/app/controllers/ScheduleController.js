import Appointment from '../models/Appointment';
import User from '../models/User';

import {
  startOfDay,
  parseISO,
  endOfDay
} from 'date-fns';

class ScheduleController {
  async index(req, res) {
    const {
      date
    } = req.query;
    const parseDate = parseISO(date);

    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    });

    if (!checkUserProvider) {
      return res.status(401).json({
        error: 'User is not a provider'
      });
    }

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)]
        }
      },
      order: ['date'],
      attributes: ['id', 'date'],
      include: {
        model: User,
        as: 'user',
        attributes: ['name'],
      }
    });

    return res.json(appointments);
  }
}

export default new ScheduleController
