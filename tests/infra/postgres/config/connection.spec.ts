import { User } from '@/infra/postgres/entities'
import { PgConnection, ConnectionNotFoundError, TransactionNotFoundError } from '@/infra/postgres/config'
import { mocked } from 'ts-jest/utils'
import { createConnection, getConnection, getConnectionManager, getRepository } from 'typeorm'

jest.mock('typeorm', () => ({
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  Column: jest.fn(),
  createConnection: jest.fn(),
  getConnection: jest.fn(),
  getConnectionManager: jest.fn(),
  getRepository: jest.fn()
}))

describe('PgConnection', () => {
  let getConnectionManagerSpy: jest.Mock
  let createQueryRunnerSpy: jest.Mock
  let createConnectionSpy: jest.Mock
  let getConnectionSpy: jest.Mock
  let hasSpy: jest.Mock
  let closeSpy: jest.Mock
  let startTransactionSpy: jest.Mock
  let releaseSpy: jest.Mock
  let commitTransactionSpy: jest.Mock
  let rollbackTransactionSpy: jest.Mock
  let sut: PgConnection

  beforeAll(() => {
    hasSpy = jest.fn().mockReturnValue(true)
    getConnectionManagerSpy = jest.fn().mockReturnValue({
      has: hasSpy
    })
    startTransactionSpy = jest.fn()
    commitTransactionSpy = jest.fn()
    rollbackTransactionSpy = jest.fn()
    releaseSpy = jest.fn()
    createQueryRunnerSpy = jest.fn().mockReturnValue({
      startTransaction: startTransactionSpy,
      commitTransaction: commitTransactionSpy,
      rollbackTransaction: rollbackTransactionSpy,
      release: releaseSpy,
    })
    createConnectionSpy = jest.fn().mockResolvedValue({
      createQueryRunner: createQueryRunnerSpy
    })
    closeSpy = jest.fn()
    getConnectionSpy = jest.fn().mockReturnValue({
      createQueryRunner: createQueryRunnerSpy,
      close: closeSpy
    })
    jest.mocked(createConnection).mockImplementation(createConnectionSpy)
    jest.mocked(getConnectionManager).mockImplementation(getConnectionManagerSpy)
    jest.mocked(getConnection).mockImplementation(getConnectionSpy)
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })
  it('should have only one instance', () => {
    const sut2 = PgConnection.getInstance()

    expect(sut).toBe(sut2)
  })
})
