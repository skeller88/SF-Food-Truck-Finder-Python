import os

from app import app


port = int(os.environ.get('PORT', 8080))
# TODO(shane): this is a hack to check if in production environment. Fix.
debug = True if os.environ.get('PORT') else False
app.run(host='0.0.0.0', port=port, debug=debug)
