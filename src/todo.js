// ============================================================
// Модуль todo — капстоун курса Jest.
// createTask уже реализован как ОБРАЗЕЦ. Остальные функции —
// реализуйте сами по TDD: сначала красный тест, потом код.
// Каждая заглушка бросает ошибку, пока вы её не реализуете.
// ============================================================

// ГОТОВО (образец). Возвращает новую активную задачу.
// Бросает ошибку "Название задачи обязательно" на пустом названии.
export function createTask(title) {
  if (!title) {
    throw new Error("Название задачи обязательно");
  }
  return { title, done: false };
}

// TODO: вернуть КОПИЮ задачи с инвертированным done (исходную не менять).
export function toggleTask(task) {
  const { title, done} = task
  return {
    title,
    done: !done
  }
}

// TODO: вернуть НОВЫЙ массив с добавленной задачей (используйте createTask).
export function addTask(tasks, title) {
  return [
    ...tasks,
    createTask(title)
  ]
}

// TODO: вернуть НОВЫЙ массив без задачи с этим названием.
export function removeTask(tasks, title) {
  return tasks.filter(e => e.title !== title)
}

// TODO: вернуть задачу с этим названием или undefined.
export function findTask(tasks, title) {
  return tasks.find(e => e.title === title)
}

// TODO: вернуть число невыполненных задач.
export function countActive(tasks) {
  return tasks.reduce((amount, curr) => 
    curr.done ? amount : ++amount, 0)
}

// TODO: вернуть объект { total, active, done, titles }.
export function summarizeTasks(tasks) {
  return {
    total: tasks.length,
    active: countActive(tasks),
    done: tasks.length - countActive(tasks),
    titles: tasks.map(e => e.title)
  }
}

// TODO (async): взять api.fetchTitles() -> массив названий,
// вернуть массив задач. Ошибку сети пробросить.
export async function loadTasks(api) {
  const titles = await api.fetchTitles()

  return titles.map(e => createTask(e))
}

// TODO: запланировать storage.save(tasks) через delay мс (по умолчанию 1000).
// Вернуть id таймера.
export function scheduleAutosave(storage, tasks, delay = 1000) {
  return setTimeout(() => {
    storage.save(tasks)
  }, delay)
}
