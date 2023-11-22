import React from 'react';
import jsPDF from 'jspdf';

export default function GeneratePDF ( form, logoImage, leftImage, doorSpecs, otherInfo )  {
    const doc = new jsPDF();

    // Set margin for the logo
    const logoMargin = 10;

    // Add logo at the left top with margin
    doc.addImage(logoImage, 'JPEG', logoMargin, logoMargin, 50, 50);

    // Set position for the form on the right side
    const formStartX = 100;
    const formStartY = 20;

    // Add form properties on the right side
    doc.text(`First Name: ${form.firstName}`, formStartX, formStartY);
    doc.text(`Last Name: ${form.lastName}`, formStartX, formStartY + 10);
    doc.text(`Email: ${form.email}`, formStartX, formStartY + 20);
    doc.text(`Telephone: ${form.telephone}`, formStartX, formStartY + 30);
    doc.text(`Address: ${form.address}`, formStartX, formStartY + 40);
    doc.text(`Municipality: ${form.municipality}`, formStartX, formStartY + 50);
    doc.text(`Postcode: ${form.postcode}`, formStartX, formStartY + 60);
    doc.text(`Country: ${form.country}`, formStartX, formStartY + 70);
    doc.text(`VAT System: ${form.vatSystem}`, formStartX, formStartY + 80);
    doc.text(`Company Name: ${form.companyName}`, formStartX, formStartY + 90);
    doc.text(`VAT Number: ${form.vatNumber}`, formStartX, formStartY + 100);
    doc.text(`Comments: ${form.comments}`, formStartX, formStartY + 110);

    // Set position for the left image
    const leftImageStartX = doc.internal.pageSize.getWidth() / 2;
    const leftImageStartY = 20;

    // Add left image on the left side
    doc.addImage(leftImage, 'PNG', leftImageStartX, leftImageStartY, 50, 50);

    // Set position for the door specs and other info
    const infoStartX = 10;
    const infoStartY = Math.max(formStartY + 120, leftImageStartY + 50) + 20;

    // Add door specs
    doc.text(`Length: ${doorSpecs.length}`, infoStartX, infoStartY);
    doc.text(`Width: ${doorSpecs.width}`, infoStartX, infoStartY + 10);
    doc.text(`Door Type: ${doorSpecs.doorType}`, infoStartX, infoStartY + 20);
    doc.text(`Number of Doors: ${doorSpecs.numberOfDoors}`, infoStartX, infoStartY + 30);
    doc.text(`Door Handle Direction: ${doorSpecs.doorHandleDirection}`, infoStartX, infoStartY + 40);
    doc.text(`Panel Type Position: ${doorSpecs.panelTypePosition}`, infoStartX, infoStartY + 50);
    doc.text(`Number of HBars: ${doorSpecs.numberOfHBars}`, infoStartX, infoStartY + 60);
    doc.text(`Number of VBars: ${doorSpecs.numberOfVBars}`, infoStartX, infoStartY + 70);
    doc.text(`Left Right Panel HBars: ${doorSpecs.leftRightPanelHBars}`, infoStartX, infoStartY + 80);
    doc.text(`Left Right Panel VBars: ${doorSpecs.leftRightPanelVBars}`, infoStartX, infoStartY + 90);
    doc.text(`Frame Color: ${doorSpecs.frameColor}`, infoStartX, infoStartY + 100);
    doc.text(`Glass Color: ${doorSpecs.glassColor}`, infoStartX, infoStartY + 110);
    doc.text(`Left Panel Width: ${doorSpecs.leftPanel.width}`, infoStartX, infoStartY + 130);
    doc.text(`Right Panel Width: ${doorSpecs.rightPanel.width}`, infoStartX, infoStartY + 140);
    doc.text(`Top Panel Length: ${doorSpecs.topPanel.length}`, infoStartX, infoStartY + 160);
    doc.text(`Top Panel Number of HBars: ${doorSpecs.topPanel.numberOfHBars}`, infoStartX, infoStartY + 170);
    doc.text(`Top Panel Number of VBars: ${doorSpecs.topPanel.numberOfVBars}`, infoStartX, infoStartY + 180);
    doc.text(`Bottom Steel Panel Length: ${doorSpecs.bottomSteelPanel.length}`, infoStartX, infoStartY + 200);

    // Add other info
    // doc.text(`Other Info: ${otherInfo}`, infoStartX, infoStartY + 220);

    // Save the PDF
    doc.save('report.pdf');
    alert("PDF")
};

