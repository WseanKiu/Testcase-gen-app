class LoadingSpinner {
  constructor() {
    this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.currentFrame = 0;
    this.interval = null;
    this.isSpinning = false;
  }

  start(message = 'Loading...') {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    this.currentFrame = 0;
    
    // Hide cursor
    process.stdout.write('\x1B[?25l');
    
    this.interval = setInterval(() => {
      process.stdout.write(`\r${this.frames[this.currentFrame]} ${message}`);
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, 100);
  }

  updateMessage(message) {
    if (this.isSpinning) {
      process.stdout.write(`\r${this.frames[this.currentFrame]} ${message}`);
    }
  }

  stop(finalMessage = '') {
    if (!this.isSpinning) return;
    
    this.isSpinning = false;
    
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    
    // Clear the line and show cursor
    process.stdout.write('\r\x1B[K');
    process.stdout.write('\x1B[?25h');
    
    if (finalMessage) {
      console.log(finalMessage);
    }
  }

  success(message) {
    if (Array.isArray(message)) {
      this.stop(`✅ ${message[0]}`);
      message.slice(1).forEach(msg => console.log(`   ${msg}`));
    } else {
      this.stop(`✅ ${message}`);
    }
  }

  error(message) {
    this.stop(`❌ ${message}`);
  }

  warning(message) {
    this.stop(`⚠️ ${message}`);
  }
}

export class StatusTracker {
  constructor() {
    this.spinner = new LoadingSpinner();
    this.startTime = null;
  }

  start(message) {
    this.startTime = Date.now();
    this.spinner.start(message);
  }

  update(message) {
    this.spinner.updateMessage(message);
  }

  complete(message, showStats = false) {
    if (showStats && this.startTime) {
      const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
      this.spinner.success(`${message} (${duration}s)`);
    } else {
      this.spinner.success(message);
    }
  }

  fail(message) {
    this.spinner.error(message);
  }

  warn(message) {
    this.spinner.warning(message);
  }

  static step(message) {
    console.log(`📋 ${message}`);
  }

  static info(message) {
    console.log(`ℹ️  ${message}`);
  }
}

export default StatusTracker;
