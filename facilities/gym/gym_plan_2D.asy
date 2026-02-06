import patterns;

// Professional LaTeX font handling
settings.tex="pdflatex";
settings.outformat="pdf";
size(18cm);

// --- Style Settings ---
pen wallPen = linewidth(2.5pt) + black;
pen dimPen = linewidth(0.6pt) + gray(0.4);
pen rackPen = linewidth(1.2pt) + black;
pen barPen = linewidth(1.5pt) + gray(0.3);
pen bagPen = linewidth(1.5pt) + gray(0.2);
pen hatchPen = linewidth(0.4pt) + gray(0.6);
pen lightPen = linewidth(0.8pt) + black;

// Define patterns
add("hatch", hatch(2.5mm, NE, hatchPen));

// --- Measurements (cm) ---
real gLen = 550; 
real gWid = 280; 
real doorW = 240;
real lightDistFromWall = 75; // 75cm from side walls
real lightL = 150; 
real lightW = 5.3;
real rackW = 121; 
real rackD = 105.5; 
real tube = 8; 
real bagDia = 60; 
real clearRad = 150;

// --- 1. Draw Garage Envelope ---
path garageBox = box((0,0), (gWid, gLen));
draw(garageBox, wallPen);
real doorStart = (gWid - doorW)/2;
draw((doorStart, 0)--(doorStart + doorW, 0), white + linewidth(6pt));

// --- 2. Parallel LED Strips (3x150cm per row) ---
void drawLightRow(real xPos) {
    // Positioning 3 lights to cover the majority of the 5.5m length
    real totalLightL = 3 * lightL;
    real startY = (gLen - totalLightL) / 2;
    for(int i=0; i<3; ++i) {
        real y = startY + i*lightL;
        // LED Tube representation
        filldraw(box((xPos - lightW/2, y), (xPos + lightW/2, y + lightL)), yellow, lightPen);
    }
}
// Row 1: 75cm from left wall
drawLightRow(lightDistFromWall);
// Row 2: 75cm from right wall (280 - 75 = 205)
drawLightRow(gWid - lightDistFromWall);

// --- 3. ATX Series 800 Setup ---
real rackY_Center = gLen - 65; 
transform T = shift(gWid/2, rackY_Center);
void drawStand(real xOffset) {
    filldraw(T*shift(xOffset - tube/2, -rackD/2)*box((0,0), (tube, rackD)), gray(0.85), rackPen);
    filldraw(T*shift(xOffset - tube/2, -tube/2)*box((0,0), (tube, tube)), gray(0.3), rackPen);
}
drawStand(-115/2);
drawStand(115/2);
draw(T*((-rackW/2, 0)--(rackW/2, 0)), rackPen + dashed);
filldraw(T*box((-220/2, -1.4), (220/2, 1.4)), gray(0.5), barPen);

// --- 4. Punchbags with 1.5m Radius Clearance ---
void drawBag(real yPos, string txt) {
    path c = circle((gWid/2, yPos), clearRad);
    save(); clip(garageBox);
    fill(c, pattern("hatch"));
    restore();
    draw(c, dashed + gray(0.5));
    filldraw(circle((gWid/2, yPos), bagDia/2), gray(0.95), bagPen);
    label(txt, (gWid/2, yPos), fontsize(8pt));
}
drawBag(gLen - 150, "Bag 1");
drawBag(gLen - 400, "Bag 2");

// --- 5. Dimensions & Annotations ---
// Light placement dimensions
draw((0, gLen - 50)--(75, gLen - 50), blue, Arrows(SimpleHead));
label("75cm", (37.5, gLen - 60), blue+fontsize(8pt));

draw((gWid, gLen - 50)--(gWid - 75, gLen - 50), blue, Arrows(SimpleHead));
label("75cm", (gWid - 37.5, gLen - 60), blue+fontsize(8pt));

// General Plan dimensions
draw((-35, 0)--(-35, gLen), dimPen, Arrows(SimpleHead));
label("5.5m", (-40, gLen/2), S, rotate(90)*dimPen);
draw((0, gLen + 35)--(gWid, gLen + 35), dimPen, Arrows(SimpleHead));
label("2.8m", (gWid/2, gLen + 45), dimPen);

label("\textbf{ATX SERIES 800 + DUAL LED LIGHTING PLAN}", (gWid/2, -70), fontsize(11pt));
