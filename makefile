MKDIR_P = mkdir -pv
RM = rm -rf
CP = cp -R 
OUT_DIR = package.json
LOCAL_START = foreman start


PROD_FILES= environments/prod/package.json
LOCAL_FILES= environments/local/package.json

.PHONY: outdir copy

all: clean pack
	

local: clean pack_local

pack:
	${CP} ${PROD_FILES} ${OUT_DIR} && \
    git add --all . && \
    git commit -m "automatic commit production"  && \
    git push heroku master  && \
    heroku open
    
pack_local:
	${CP} ${LOCAL_FILES} ${OUT_DIR} && \
    ${LOCAL_START}



clean: 
	${RM} ${OUT_DIR}

${PROD_DIR}:
	       ${MKDIR_P} ${PROD_DIR}

