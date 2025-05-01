# AI-Assisted Coding Workshop Materials

This repository contains materials for the Concentrix AI-Assisted Coding workshop. It includes prompt examples, sample code, and documentation to help participants understand and apply AI-assisted coding techniques.

## Contents

* `prompts/`: Contains prompt examples for various coding tasks.
* `app/`: Includes sample code for a weather application.
* `README.md`: Provides an overview of the repository.

## Prerequisites

### Node.js Installation

This project requires Node.js to be installed on your machine. If you don't have Node.js installed, follow these instructions:

#### Windows

1. Visit the [official Node.js website](https://nodejs.org/)
2. Download the recommended LTS (Long Term Support) version
3. Run the installer and follow the installation wizard

#### macOS

Using Homebrew (recommended):
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

Alternatively, you can download the installer from the [official Node.js website](https://nodejs.org/).

To verify your installation, open a terminal or command prompt and run:
```bash
node --version
npm --version
```

## Installing and starting the example api

Clone the code base as follows:

```bash
git clone https://github.com/kevin-thomas-cnx/ai-assisted-coding-hands-on.git
```

Enter the app folder:

```bash
cd ai-assisted-coding-hands-on/app
```

Install the dependencies:

```bash
npm install
```

Run the unit tests:

```bash
npm test
```

Run the API service:

```bash
npm run dev
```

Visit the API docs url:

http://localhost:3000/api-docs/


## Additional Resources

For additional resources and detailed documentation, please visit the [AI-Assisted Coding Hands-On section](https://cnxmail.sharepoint.com/sites/GenAIEng/SitePages/AI-Assisted-Coding_Hands-On.aspx) on the AI Council SharePoint site.

## Contact

If you have any questions, please contact `kevin.thomas1` on Teams.
`