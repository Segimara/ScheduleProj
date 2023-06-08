# Installation Proccces
## Requirements:
 - node.js
 - visual studio
## Installation on Windows  
 - Clone repo 

 ``` git clone https://github.com/Segimara/ScheduleProj.git ```

- You must have ports 7000 and 7001 free

### Fast run backend servers:

- Run RunApi.bat and RunIdentity.bat scripts with will open the directory with the project and execute `dotnet watch run` for the project directory

### Development backend servers run in Visual studio 

- Open `BasicWebApi.sln` file in `ScheduleProj\BasicOutline\BasicWebApi` directory
- Setup multiple running  projects by right click on solution, go to `Configure Startup Projects...` end select 2 ruing projects

### Frontend Setup

- open console in `ScheduleProj\BasicOutline\BasicScheduleUI` directory
- install dependencies bu running `npm i` command
- start frontend app by running `ng serve` 

