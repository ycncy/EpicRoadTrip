import jsPDF from 'jspdf';

class TripPDF {
  private pdf: jsPDF;

  constructor() {
    this.pdf = new jsPDF();
  }

  public addTitle(title: string, x: number, y: number): void {
    this.pdf.setFontSize(16);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, x, y);
  }

  public addSubtitle(subtitle: string, x: number, y: number): void {
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(subtitle, x, y);        
  }
  public addText(text: string, x: number, y: number): void {
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(text, x, y);
  }

  public addImage(imageUrl: string, x: number, y: number, width: number, height: number): void {
    const img = new Image();
    img.src = imageUrl;
    this.pdf.addImage(img, 'JPEG', x, y, width, height);
  }

  public save(fileName: string): void {
    this.pdf.save(fileName);
  }
}

export default TripPDF;
