<img src="http://i.imgur.com/5vo81dC.png" alt="Boojum logo" title="Boojum - Liquid, a superfluid" align="right" width="100px" />



[![Build Status](https://travis-ci.org/byjord/boojum.svg?branch=master)](https://travis-ci.org/byjord/boojum)
[![Known Vulnerabilities](https://snyk.io/test/github/byjord/boojum/badge.svg)](https://snyk.io/test/github/byjord/boojum)
[![Test Coverage](https://codeclimate.com/github/byjord/boojum/badges/coverage.svg)](https://codeclimate.com/github/byjord/boojum/coverage)
[![Greenkeeper badge](https://badges.greenkeeper.io/byjord/boojum.svg)](https://greenkeeper.io/)
[![Code Climate](https://codeclimate.com/github/byjord/boojum/badges/gpa.svg)](https://codeclimate.com/github/byjord/boojum)
[![Issue Count](https://codeclimate.com/github/byjord/boojum/badges/issue_count.svg)](https://codeclimate.com/github/byjord/boojum)		


# Boojum

***Currently Boojum is under development, so trying to use it is discouraged unless you're looking to play around with something novel. [Subscribe & Watch Boojum for updates](https://github.com/byjord/boojum/subscription)***

Boojum lets you run Shopify themes locally or on a CI service _(Hopefully)_. No persistent internet connection required. Do awesome things.

Why use Boojum when Shopify provides [awesome](https://help.shopify.com/themes/development/getting-started) [development](https://help.shopify.com/themes/development/getting-started/development-environment) [infrastructure](https://help.shopify.com/themes/development/getting-started/choosing-an-editor)? I like to build things when I'm on a train or airplane, so I needed something that would allow me to work and preview offline.

## Boojum Structure

### Controllers

1. Render
2. Router
3. Stalker

### Plugins
Plugins work with Registers.

1. **Generator** - A generator builds routes based on processed files.
	
	1. Collection
	2. Page
	3. Product

2. **Renderer** - Take RAW unprocessed markup and generate output HTML.
	1. JSON
	2. Liquid
	3. Plain - Used for files like JS and CSS
	4. Swig

### Registers 
Registers are objects that can be dynamically set.

  1. Generator
  2. Renderer


---


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Development
Quick start: `git clone https://github.com/byjord/boojum.git && cd boojum && npm i`

1. Clone the repo
    ```terminal
    git clone https://github.com/byjord/boojum.git && cd boojum
    ```

2. Install dependencies
    ```terminal
    npm install
    ```

3. (Optional) Worship the lord and saviour
    ```terminal
    @elonmusk you da best
    ```

---

## License

This project currently does not have a licence, but one will be selected soon.

## Acknowledgments

* [Hexo](https://github.com/hexojs/hexo/) - Boojum started as a fork of Hexo
