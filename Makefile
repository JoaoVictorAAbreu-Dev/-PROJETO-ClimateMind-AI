.PHONY: setup run dev stop clean help

help:
	@echo "ClimateMind AI - Available commands:"
	@echo "  make setup       - Install all dependencies"
	@echo "  make dev         - Run frontend and backend"
	@echo "  make backend     - Run only backend"
	@echo "  make frontend    - Run only frontend"
	@echo "  make docker      - Run with Docker Compose"
	@echo "  make clean       - Clean dependencies"

setup:
	@echo "Installing dependencies..."
	cd backend && python -m venv venv && . venv/bin/activate && pip install -r requirements.txt
	cd frontend && npm install
	@echo "✓ Setup complete!"

dev:
	@echo "Starting application..."
	@echo "Backend: http://localhost:8000"
	@echo "Frontend: http://localhost:5173"
	@echo "API Docs: http://localhost:8000/docs"
	$(MAKE) -j 2 backend frontend

backend:
	cd backend && . venv/bin/activate && uvicorn app.main:app --reload

frontend:
	cd frontend && npm run dev

docker:
	docker-compose up --build

clean:
	rm -rf backend/venv frontend/node_modules
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type d -name .pytest_cache -exec rm -rf {} +
