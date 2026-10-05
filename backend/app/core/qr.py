import base64
from io import BytesIO

import qrcode


def generate_qr_data_url(data: str) -> str:
    """Renders `data` as a QR code PNG and returns it as a base64 data URL,
    ready to drop straight into an <img src="..."> on the frontend."""
    img = qrcode.make(data)
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{encoded}"