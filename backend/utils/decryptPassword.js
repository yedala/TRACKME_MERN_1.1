const forge = require('node-forge');

const privateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQChA1N5Mqa6fbqEk113fBRZ3LEMhwVJ8NwxfAcmDvOKfXVmakfI
Jsqz2UkREzQIE+/sIil/J/NsaDoJ6KW+Xs5+vEjnIXSVakvhl/9giB8a8Aektl6I
zGLqtdYC07Zy8xdi1H6H7qPyXQ6RS64XZR2BuA/cYRaq8RG4e/8t8BRdoQIDAQAB
AoGASM98O95Pzx1z7ufE6HdPrKND3Oph1eH5cNcpVGiGcSXypPGCrFv+Zf3oMLSC
XvTFFf8MzNeAGJG5TSnLaZ7tuWF54Iw3D4dxqwPq3b8yQmiB2de9aS5aOq2iV0uw
MSYc81B12hrYW6ulIRROLIm39GWrZp1tQ+iCTmagT88Cc1ECQQDeyVu10DYv1sfx
ThwLAhwg5uguPLEaHqzXdkHLmrVktzm67c4MjWwN6wYkFOejameDZUx8ptutlWu5
vnLDr86rAkEAuQRhu2SOO5ZaY5M6Guowb+7tB6M75p5qPD6cLlzLs+qIAOtV2PHg
j3gEsr9/gUE7vgO0i6M/Mti8xSqYsiBU4wJBAJ5ccVVOuIXO3Xc4d5SXnlkA6b+c
IqOXdHL/u4s34ILD/0RRr6qaiFloW4ggV/uAMi5jPjhI/1RnJxj0OG3DNVsCQCTo
A9rOnzSxtEwipTeTOaBKZ8vbOuqw9P4ZeywgZJ36DbEpQJGrBiF4Tm+dlYCiE5m+
wXgNU2EALP+jlJwLqQMCQHE8HGfHCAyTCAQiIyfd6bcnnxhjCXXQxC+MhgpJk3fF
Ys2IJ9Zzz2ddrTxYdTiBlvYBvcs746G9x33SYHgb+TM=
-----END RSA PRIVATE KEY-----
`;


const privateKeyPem = forge.pki.privateKeyFromPem(privateKey);

const decryptPassword = (password) => {
    const encryptedBytes = forge.util.decode64(password);
    return privateKeyPem.decrypt(encryptedBytes, 'RSA-OAEP', {
        md: forge.md.sha256.create()
    });
}

module.exports = { decryptPassword }