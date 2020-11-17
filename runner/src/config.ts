import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

import type { Config } from './types'

/**
 * Настройки по умолчанию
 */
export const defaultConfig: Config = {
  languages: {
    js: {
      name: 'JavaScript',
      interpreter: 'node',
      interpreter_args: '%file%'
    },
    ts: {
      name: 'TypeScript',
      interpreter: 'node',
      interpreter_args: '-r ts-node/register %file%'
    },
    csharp: {
      name: 'C#',
      interpreter: 'dotnet',
      interpreter_args: 'run',
      initTouch: 'playground.csproj',
      initScript: 'dotnet new console -n playground -o .'
    },
    python: {
      name: 'Python',
      interpreter: 'python',
      interpreter_args: '%file%'
    }
  }
}

let config = {} as Config

export const dataDir = resolve(process.cwd(), 'data')
export const configPath = resolve(dataDir, 'config.json')

/**
 * Применяет настройки по умолчанию и сохраняет их
 */
export const writeDefault = () => {
  config = defaultConfig
  write()
}

/**
 * Сохраняет текущие настройки в файл
 */
export const write = () => {
  writeFileSync(configPath, JSON.stringify(config, null, 2))
}

/**
 * Получает настройки из файла
 */
export const read = () => {
  // Может выбросить исключение
  config = JSON.parse(readFileSync(configPath, 'utf8'))
}

/**
 * Инициализирует файл или папку с настройками
 */
export const init = () => {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, {
      recursive: true
    })
  }

  if (!existsSync(configPath)) {
    writeDefault()
    return
  }

  try {
    read()
  } catch (e) {
    console.error('Config file is corrupted. Restoring default one...')
    writeDefault()
  }
}

export default config
