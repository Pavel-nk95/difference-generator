### 🔹 Difference Generator 🔹

Project 'Difference Generator'. The project implements a utility to find differences in configuration files.

### Description

Utility Features:
- support for different formats - json, yaml;
- generate report in three different views;

### Installation

```npm i gendiff```

### Run

```
$ gendiff --help
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           output usage information
```

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Pavel-nk95/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Pavel-nk95/frontend-project-lvl2/actions)

### Diff tests and linter status:
[![diff-check](https://github.com/Pavel-nk95/frontend-project-lvl2/actions/workflows/diff-check.yml/badge.svg?branch=main)](https://github.com/Pavel-nk95/frontend-project-lvl2/actions/workflows/diff-check.yml)

### Maintainability Badge:
[![Maintainability](https://api.codeclimate.com/v1/badges/1837025696761d238ccf/maintainability)](https://codeclimate.com/github/Pavel-nk95/frontend-project-lvl2/maintainability)

### Test Coverage Badge:
[![Test Coverage](https://api.codeclimate.com/v1/badges/1837025696761d238ccf/test_coverage)](https://codeclimate.com/github/Pavel-nk95/frontend-project-lvl2/test_coverage)

### Example of comparing JSON files. Formatter: 'stylish':
[![asciicast](https://asciinema.org/a/459767.svg)](https://asciinema.org/a/459767)

### Example of comparing YAML files. Formatter: 'stylish':
[![asciicast](https://asciinema.org/a/459768.svg)](https://asciinema.org/a/459768)

### Example of comparing JSON and YAML files. Formatter: 'plain':
[![asciicast](https://asciinema.org/a/459967.svg)](https://asciinema.org/a/459967)

### Example of comparing JSON and YAML files. Formatter: 'json':
[![asciicast](https://asciinema.org/a/460058.svg)](https://asciinema.org/a/460058)