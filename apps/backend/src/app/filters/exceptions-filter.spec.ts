import { AppExceptionFilter } from './exceptions-filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '@nestjs/common';

describe('AppExceptionFilter', () => {
  let filter: AppExceptionFilter;
  let mockLoggerError: jest.SpyInstance;

  beforeEach(() => {
    filter = new AppExceptionFilter();
    mockLoggerError = jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    mockLoggerError.mockRestore();
  });

  it('should handle HttpException and return appropriate response', () => {
    const mockHttpException = new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockRequest = { url: '/test' };

    const mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;

    filter.catch(mockHttpException, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.FORBIDDEN,
      timestamp: expect.any(String),
      path: '/test',
      message: 'Forbidden',
    });
    expect(mockLoggerError).toHaveBeenCalledWith(
      expect.stringContaining('Error:'),
    );
  });

  it('should handle generic errors and return status 500', () => {
    const mockError = new Error('Unexpected error');
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockRequest = { url: '/test' };

    const mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;

    filter.catch(mockError, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 500,
      timestamp: expect.any(String),
      path: '/test',
      message: 'Internal server error',
    });
    expect(mockLoggerError).toHaveBeenCalledWith(
      expect.stringContaining('Error:'),
    );
  });
});
