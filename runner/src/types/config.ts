export type LanguageConfig = {
  /**
   * Название языка
   */
  name: string

  /**
   * Папка выполнения программы
   */
  cwd?: string

  /**
   * Аргументы для запуска
   */
  args?: string

  /**
   * Исполняемый файл интерпретатора
   */
  interpreter?: string

  /**
   * Аргументы для интерпретатора
   */
  interpreter_args?: string

  /**
   * Команда для сборки проекта
   * Запускается перед выполнением
   */
  buildCommand?: string

  /**
   * Файл для проверки инициализации
   */
  initTouch?: string

  /**
   * Скрипт инициализации
   */
  initScript?: string

  /**
   * Различные настройки окружения
   */
  env?: string
}

export type Config = {
  languages: Record<string, LanguageConfig>
}
