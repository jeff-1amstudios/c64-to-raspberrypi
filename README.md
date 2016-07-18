The Commodore64 has a general purpose I/O port called the UserPort.  It has the ability to function as a TTL-level serial port.  
By creating a cable which has a C64 connector on one side, and a USB TTL<->RS-232 converter on the other side, it is possible 
to connect a 1980's Commodore to the Raspberry Pi!

This repo contains 2 main files - 

`main.asm` - This contains 6502 assembly code to open a connection channel and send and recieve characters through it.

`rs232-listener/listener.js` - A simple node app which listens on the serial port and echos characters to the screen and also back through the serial connection.

![](/demo.jpg)

Once the connection between the two is working, the Pi can be used for internet-facing connectivity, driven by simple commands from the c64 (think: home automation, twitter console etc!)