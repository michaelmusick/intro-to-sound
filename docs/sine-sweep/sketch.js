var osc, freq = 20,
    str;
var fft;
var binCount = 1024;
var bins = new Array(binCount);

function preload() {
    osc = new p5.Oscillator(freq);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    osc.amp(0.5);
    // osc.freq(freq);
    osc.start();
    sineSweep();

    var smoothing = 0.6;
    fft = new p5.FFT(smoothing, binCount);

    for (var i = 0; i < binCount; i++) {
        bins[i] = new Bin(i, binCount);
    }
}

function draw() {
    background(255);

    var spectrum = fft.analyze();

    push();
    var prevPoint = 0;
    for (var i = 0; i < binCount; i++) {
        var previousValue = prevPoint;
        prevPoint = bins[i].drawLog(i, binCount, spectrum[i], previousValue);
    }
    pop();


    color(0);
    textSize(36);
    text(str, 10, height / 2);
}

function sineSweep() {
    if (freq < 20000) {
        str = "Freq range is " + freq + "hz - " + (freq * 2) + "hz";
        freq = freq * 2;
        osc.freq(freq, 3);
        setTimeout(function() {
            sineSweep();
        }, 3000);
    } else {
        str = "Too high of frequency..."
        osc.stop();
    }
}




// ==========
// Bin Class
// ==========

var Bin = function(index, totalBins) {
    // maybe redundant
    this.index = index;
    this.totalBins = totalBins;
    this.color = color(map(this.index, 0, this.totalBins, 0, 255), 255, 255);

    this.isTouching = false;
    this.x;
    this.width;
    this.value;
}

Bin.prototype.drawLog = function(i, totalBins, value, prev) {
    this.x = map(Math.log(i + 2), 0, Math.log(totalBins), 0, width - 200);
    var h = map(value, 0, 255, height, 0) - height;
    this.width = prev - this.x;
    this.value = value;
    this.draw(h);
    return this.x;
}

Bin.prototype.drawLin = function(i, totalBins, value) {
    this.x = map(i, 0, totalBins, 0, width - 200);
    this.width = -width / totalBins;
    this.value = value;
    var h = map(value, 0, 255, height, 0) - height;
    this.draw(h);
}

var selectedBin;

Bin.prototype.draw = function(h) {
    if (this.isTouching) {
        selectedBin = bins[this.index];
        this.freq = Math.round(this.index * 22050 / this.totalBins);
        fill(100)
    } else {
        fill(this.color);
    }
    rect(this.x, height, this.width, h);
}
