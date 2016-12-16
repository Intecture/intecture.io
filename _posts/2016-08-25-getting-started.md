---
layout: post
title:  "Getting Started"
date:   2016-08-25 13:08:16
summary: "This post is out of date. Check out the docs for an up to date guide."
---
<div class="warning">
    <p>This post is out of date. Check out <a href="{{ site.baseurl }}/docs">the docs</a> for an up to date reference.</p>
</div>

Over the past few months, the rate of change to Intecture has been substantial. A number of large features have landed, including authentication, which has changed Intecture's internal workflow somewhat.

Unfortunately, during this time the documentation and tooling has languished, which is why I'm writing this guide to help you get up and running with Intecture. In the medium term the goal is to merge this guide into the existing documentation as part of a broader revamp, and to improve the tooling around installing Intecture components without the manual handling.

## 1. Prepare your environment

Currently, the best method for installing Intecture is by downloading a source code release and using the project's Makefile to build and install its assets. This will change in the near future as the [RustBucket](https://rust-bucket.io) project matures and binary releases become the norm.

In the meantime, you will need to install the [Rust compiler and Cargo](https://rustup.rs) to your nodes in order to build Intecture projects. You will also need to build and install the latest version of [ZeroMQ](https://github.com/zeromq/zeromq4-1/releases/download/v4.1.5/zeromq-4.1.5.tar.gz) and [CZMQ](https://github.com/zeromq/czmq/releases/download/v3.0.2/czmq-3.0.2.tar.gz).

### The `/usr/local` path

Intecture installs its components to `/usr/local/...`. If you get a "not found" error, then it's likely because `/usr/local/` is not part of your paths. We can fix this by running:

~~~
export PATH=$PATH:/usr/local/bin
export LIBRARY_PATH=/usr/local/lib
export LD_LIBRARY_PATH=/usr/local/lib
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig
~~~

## 2. Authentication

The unseen backbone of Intecture is the authentication system. This system is the trusted third party in any transaction, helping you to mutually authenticate users and hosts without having to manually distribute public keys to your entire environment.

The Auth server can live anywhere you please, though it's recommended that you place it somewhere far away from public access (behind the DMZ, if you have one). Once you've chosen a location, let's install it:

~~~
curl https://codeload.github.com/intecture/auth/tar.gz/0.0.2 -o auth.tar.gz
tar xf auth.tar.gz
cd auth-0.0.2
make && make install
~~~

### 2a. The first user

After installing the Auth server, you will need to generate your user certificate, which you'll use to create certificates for your hosts:

~~~
inauth_cli user add <my_user>
~~~

Take note of this certificate now, because you'll need it soon.

### 2b. Starting the Auth server

Finally, you'll need to turn it on! Starting the Auth server is currently a manual process, though in the near future you'll be able to use an init script:

~~~
inauth &
~~~

## 3. Setup your dev environment

Your dev environment is the place where you'll be running your Intecture projects from. This would usually be your workstation, or a dev VM.

### 3a. Install the API

~~~
curl https://codeload.github.com/intecture/api/tar.gz/0.2.1 -o api.tar.gz
tar xf api.tar.gz
cd api-0.2.1
make && make install
~~~

If you're wanting to use Intecture with a language other than Rust, you'll also need the C headers:

~~~
cp bindings/c/inapi.h /usr/local/include
~~~

...and if you're using PHP, you'll need the PHP plugin (remember to install PHP first!):

~~~
cd bindings/php
phpize
./configure
make
make install
~~~

### 3b. Install the CLI

~~~
curl https://codeload.github.com/intecture/cli/tar.gz/0.2.1 -o cli.tar.gz
tar xf cli.tar.gz
cd cli-0.2.1
make && make install
~~~

### 3c. Create your first Intecture project

~~~
incli init --example myproj rust
~~~

If you want a C project, replace "rust" with "c" in the command above. Similarly for PHP, replace "rust" with "php".

Also, if you're wondering about the `--example` flag, it's to tell the CLI to clone and example project, so you don't have to start from scratch.

### 3d. Install your user certificate

Remember that user certificate you created in step `2a`? Well, now you'll need to copy the contents of that certificate to your project at `myproj/user.crt`.

You must call the certificate `user.crt` and it must live in your project root. Remember to **never commit this certificate to version control** and to **never share this certificate with anyone**!

### 3e. Install the Auth public certificate

Next, we need to copy the Auth server's public certificate to your project. You can find the public certificate on the Auth server at `/usr/local/etc/intecture/auth.crt_public`. **Do not copy the private certificate! This should be kept private on the Auth server.**

Copy the contents of `auth.crt_public` to `myproj/auth.crt`. As for the user certificate, the auth certificate must be called `auth.crt` and must live in your project root.

### 3f. Update `project.json`

Each Intecture project has a `project.json` to store some basic configuration details. Let's edit this to update it with our Auth server's hostname and port number (we are interested in the **api_port** from your Auth server config file):

~~~
vi myproj/project.json
~~~

### 3g. Create a new host certificate

Every managed host (a server that you want Intecture to configure) needs to have a host certificate installed. You can generate host certificates from your Intecture project:

~~~
cd myproj/
incli host add <hostname>
~~~

Note that `<hostname>` should be the hostname of your server. It is also the name that Intecture uses to store and retrieve the host's certificate, so make sure it's valid or you'll have connection issues. An IP address is perfectly acceptible too, though less memorable.

## 4. Managed host

A managed host in Intecture terminology is any server that you want to configure with Intecture. It might be a web server, an LDAP server or a toaster. As long as the Intecture Agent can be installed on it, we don't discriminate.

On your managed host, let's install the Agent:

~~~
curl https://codeload.github.com/intecture/agent/tar.gz/0.2.1 -o agent.tar.gz
tar xf agent.tar.gz
cd agent-0.2.1
make && make install
~~~

### 4a. Configure `agent.json`

Once installed, we must tell the Agent where the Auth server is and what port it is running on (we are interested in the *update_port* from your Auth server config file):

~~~
vi /usr/local/etc/intecture/agent.json
~~~

### 4b. Install the Agent certificate

Now we need that certificate you generated in step `3g`. Copy the contents of that certificate to `/usr/local/etc/intecture/agent.crt`.

### 4c. Install the Auth public certificate

As for step `3e`, we need to copy the Auth server's public certificate to the Agent. On the Agent, the Auth public certificate lives in `/usr/local/etc/intecture/auth.crt_public`, though this location is configurable in `agent.json`.

### 4d. Starting the Agent service

Finally, you'll need to start the Agent! Starting the Agent service is currently a manual process, though in the near future you'll be able to use an init script:

~~~
inagent &
~~~

## 5. Run your project

Back on your dev machine, let's run the Intecture project. We should get some friendly output telling us about the server we just connected to.

~~~
cd /path/to/myproj
incli run <hostname>
~~~

As before, `<hostname>` is the hostname of the server as you configured it before in step `3g`.

## Stay tuned!

Writing this article has been a bit frustrating, as there are several projects on the cusp of being delivered which will simplify this process significantly. As such, this article will be updated as those projects land.

**First, there's RustBucket (https://rust-bucket.io).** RustBucket is a binary package manager I wrote to help distribute and deploy Rust projects. Very soon there will be RustBucket packages available for Intecture, which will remove the need to install Rust, Cargo, ZeroMQ and CZMQ. Installation will be a single step, which involves precisely zero compilation. Huzzah!

**Secondly, init scripts are being written,** so you can let Upstart (or whatever is close to your heart...Systemd?) worry about starting, stopping, enabling, disabling and licking your Intecture services.

**Thirdly, the CLI will soon be able to bootstrap hosts.** This means that adding new servers to your managed estate will be a single command affair. Groovy.

**Fourthly, there will be a new Intecture Installer.** The aim of this project is to remove all of the manual handling of certificates and config files that you've just endured above, and give you a nice web interface instead. This project is a little further off, however.

Anyway, lots happening, so stay tuned!

Cheers,

**Pete**<br />
<s>Vice President</s> Junior Vice President, Between Lines Ltd.
