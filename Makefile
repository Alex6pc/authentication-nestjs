.PHONY: all install install-backend install-frontend dev backend frontend codegen db-migrate db-generate clean status kill

# Default target
all: dev

# Install dependencies for both backend and frontend
install: install-backend install-frontend
	@echo "All dependencies installed."

install-backend:
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Generating Prisma Client..."
	cd backend && npx prisma generate

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

# Kill any processes on dev ports (3000, 3002)
kill:
	@echo "Killing processes on ports 3000 and 3002..."
	-@fuser -k 3000/tcp 2>/dev/null || true
	-@fuser -k 3002/tcp 2>/dev/null || true
	@sleep 1
	@echo "Done."

# Start backend and frontend together with prefixed logs
dev: kill
	@echo "Starting backend and frontend (Ctrl+C to stop)..."
	@echo "Backend: http://localhost:3002/graphql | Frontend: http://localhost:3000"
	(cd backend && npm run start:dev) 2>&1 | sed 's/^/[backend] /' & \
	(cd frontend && NODE_OPTIONS="--max-old-space-size=4096" npm run dev) 2>&1 | sed 's/^/[frontend] /' & \
	wait

# Start backend only
backend:
	@echo "Starting backend on http://localhost:3002..."
	cd backend && npm run start:dev

# Start frontend only
frontend:
	@echo "Starting frontend on http://localhost:3000..."
	cd frontend && NODE_OPTIONS="--max-old-space-size=4096" npm run dev

# Generate GraphQL types (requires backend running at localhost:3002)
codegen:
	@echo "Generating GraphQL types..."
	cd frontend && npm run codegen

# Prisma: generate client
db-generate:
	@echo "Generating Prisma client..."
	cd backend && npx prisma generate

# Prisma: run migrations
db-migrate:
	@echo "Running database migrations..."
	cd backend && npx prisma migrate dev

# Show status
status:
	@echo "=== Backend (port 3002) ==="
	@lsof -i :3002 2>/dev/null || true
	@echo ""
	@echo "=== Frontend (port 3000) ==="
	@lsof -i :3000 2>/dev/null || true

# Clean build artifacts
clean:
	@echo "Cleaning..."
	rm -rf backend/dist
	rm -rf frontend/.nuxt
	rm -rf frontend/.output
	rm -rf frontend/node_modules/.cache
	@echo "Done."
