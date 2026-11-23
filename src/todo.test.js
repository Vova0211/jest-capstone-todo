import {
  createTask,
  toggleTask,
  addTask,
  removeTask,
  findTask,
  countActive,
  summarizeTasks
} from "./todo";

describe("createTask", () => {
  test("создаёт активную задачу", () => {
    expect(createTask("Хлеб")).toEqual({ title: "Хлеб", done: false });
  });

  test.each([[""], [null], [undefined]])(
    "бросает ошибку на входе %p",
    (bad) => {
      expect(() => createTask(bad)).toThrow("Название задачи обязательно");
    }
  );
});


describe("toggleTask", () => {
  test("возвращает новую задачу и не изменяет исходную", () => {
    const task = {
      title: "Хлеб",
      done: false,
    };

    const result = toggleTask(task);

    expect(result).toEqual({
      title: "Хлеб",
      done: true,
    })

    expect(task).toEqual({
      title: "Хлеб",
      done: false,
    })
  })
})

describe("addTask", () => {
  test("добавляет новую активную задачу", () => {
    const tasks = [
      {
        title: "Молоко",
        done: false,
      },
    ]

    const result = addTask(tasks, "Хлеб")

    expect(result).toEqual([
      {
        title: "Молоко",
        done: false,
      },
      {
        title: "Хлеб",
        done: false,
      },
    ])
  })
})

describe("removeTask", () => {
  test("удаляет задачу по названию", () => {
    const tasks = [
      { title: "Молоко", done: false },
      { title: "Хлеб", done: true },
    ]

    expect(removeTask(tasks, "Молоко")).toEqual([
      { title: "Хлеб", done: true },
    ])
  })
})

describe("findTask", () => {
  const tasks = [
    { title: "Молоко", done: false },
    { title: "Хлеб", done: true },
  ]

  test("находит задачу по названию", () => {
    expect(findTask(tasks, "Хлеб")).toBe(tasks[1])
  })

  test("возвращает undefined, если задача не найдена", () => {
    expect(findTask(tasks, "Сыр")).toBeUndefined()
  })
})

describe("countActive", () => {
  test("считает количество невыполненных задач", () => {
    const tasks = [
      { title: "Молоко", done: false },
      { title: "Хлеб", done: true },
      { title: "Сыр", done: false },
    ]

    const amount = countActive(tasks)

    expect(amount).toBe(2)
  })

  test("возвращает 0 для пустого массива", () => {
    expect(countActive([])).toBe(0)
  })
})

describe("summarizeTasks", () => {
  test("возвращает общую сводку задач", () => {
    const tasks = [
      { title: "Молоко", done: false },
      { title: "Хлеб", done: true },
      { title: "Сыр", done: false },
    ]

    const summarizeOfTasks = summarizeTasks(tasks)

    expect(summarizeOfTasks).toEqual({
      total: 3,
      active: 2,
      done: 1,
      titles: ["Молоко", "Хлеб", "Сыр"],
    })
  })
})