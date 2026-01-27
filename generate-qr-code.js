const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Your live app URL
const APP_URL = 'https://kindness-jar.netlify.app/kindness-jar-realistic-glass.html';

// QR Code options for high quality
const qrOptions = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    quality: 1,
    margin: 2,
    color: {
        dark: '#2D3748',  // Dark blue-gray
        light: '#FFFFFF'  // White background
    },
    width: 1000  // High resolution for printing
};

// Generate QR code
async function generateQRCode() {
    try {
        // Generate high-res QR code for printing
        await QRCode.toFile(
            path.join(__dirname, 'kindness-jar-qr-code.png'),
            APP_URL,
            qrOptions
        );

        console.log('✅ QR Code generated successfully!');
        console.log('📍 Location: kindness-jar-qr-code.png');
        console.log('🔗 URL:', APP_URL);
        console.log('📏 Size: 1000x1000px (high resolution for printing)');
        console.log('\n🎯 You can now use this QR code for:');
        console.log('   - Posters and flyers');
        console.log('   - Business cards');
        console.log('   - Social media posts');
        console.log('   - Email signatures');
        console.log('   - Presentations');

    } catch (error) {
        console.error('❌ Error generating QR code:', error);
    }
}

generateQRCode();
