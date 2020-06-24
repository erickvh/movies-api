import { TypeOrmExceptionFilter } from './typeorm-error.filter';

describe('TypeormErrorFilter', () => {
  it('should be defined', () => {
    expect(new TypeOrmExceptionFilter()).toBeDefined();
  });
});
