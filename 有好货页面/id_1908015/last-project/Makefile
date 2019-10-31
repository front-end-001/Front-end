dev:
	yarn run dev

build:
	@CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -v -mod=vendor -ldflags "-w -s" -i -o api main.go
