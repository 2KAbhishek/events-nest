import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';

describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue(new Event()),
            update: jest.fn().mockResolvedValue(new Event()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    eventsController = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(eventsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const result = [];
      jest.spyOn(eventsService, 'findAll').mockResolvedValue(result);
      expect(await eventsController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const result = new Event();
      jest.spyOn(eventsService, 'findOne').mockResolvedValue(result);
      expect(await eventsController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const createEventDto: CreateEventDto = {
        title: 'Test Event',
        description: 'Some description',
        date: '2025-01-21',
      };
      const result = new Event();
      jest.spyOn(eventsService, 'create').mockResolvedValue(result);
      expect(await eventsController.create(createEventDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const updateEventDto: CreateEventDto = {
        title: 'Updated Event',
        description: 'Updated Description',
        date: '2025-01-21',
      };
      const result = new Event();
      jest.spyOn(eventsService, 'update').mockResolvedValue(result);
      expect(await eventsController.update(1, updateEventDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove an event', async () => {
      jest.spyOn(eventsService, 'remove').mockResolvedValue(undefined);
      expect(await eventsController.remove(1)).toBeUndefined();
    });
  });
});
