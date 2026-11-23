import { loadTasks, scheduleAutosave } from "./todo";

describe("loadTasks", () => {
  const titles = ["Молоко", "Хлеб", "Сыр"]

  test("возвращает массив задач", async () => {
    const api = {
      fetchTitles: jest.fn().mockResolvedValue(titles)
    }

    const tasks = await loadTasks(api)

    expect(api.fetchTitles).toHaveBeenCalledTimes(1)

    expect(tasks).toEqual([
      { title: "Молоко", done: false },
      { title: "Хлеб", done: false },
      { title: "Сыр", done: false },
    ])
  })

  test("возвращает массив задач", async () => {
    const api = {
      fetchTitles: jest.fn().mockRejectedValue(new Error('Api error'))
    }

    expect(api.fetchTitles).not.toHaveBeenCalled()
    expect(loadTasks(api)).rejects.toThrow('Api error')
  })
})

describe("scheduleAutosave", () => {
  const tasks = [
    { title: "Молоко", done: false },
    { title: "Хлеб", done: true },
  ]

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test("не сохраняет задачи синхронно", () => {
    const storage = { save: jest.fn() }

    scheduleAutosave(storage, tasks)

    expect(storage.save).not.toHaveBeenCalled()
  })

  test("сохраняет задачи по истечении задержки по умолчанию", () => {
    const storage = { save: jest.fn() }

    scheduleAutosave(storage, tasks)
    jest.advanceTimersByTime(1000)

    expect(storage.save).toHaveBeenCalledTimes(1)
    expect(storage.save).toHaveBeenCalledWith(tasks)
  })

  test("не сохраняет задачи, если таймер отменён", () => {
    const storage = { save: jest.fn() }

    const timerId = scheduleAutosave(storage, tasks)
    clearTimeout(timerId)
    
    jest.advanceTimersByTime(1000)

    expect(storage.save).not.toHaveBeenCalled()
  })
})