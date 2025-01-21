// src/database/events.seed.ts
import { format, addDays } from 'date-fns';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { Event } from '../events/event.entity';

const eventData = [
  {
    title: 'Team Weekly Sync',
    description: 'Regular team sync meeting to discuss progress and blockers',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    title: 'Product Demo',
    description: 'Demonstration of new features to stakeholders',
    date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
  },
  {
    title: 'Technical Planning',
    description: 'Planning session for next quarter technical initiatives',
    date: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
  },
  {
    title: 'Client Meeting',
    description: 'Review progress with client and gather feedback',
    date: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
  },
  {
    title: 'Team Building',
    description: 'Virtual team building activity',
    date: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
  },
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  try {
    const eventRepository = dataSource.getRepository(Event);
    // Clear existing data
    await eventRepository.clear();
    // Insert new data
    const events = eventRepository.create(eventData);
    await eventRepository.save(events);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

void bootstrap();
