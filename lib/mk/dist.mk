# dist.mk -- distribution copy rules
# GENERATED from Dist/PAPERS.yaml by paper/scripts/generate_mk.py
# DO NOT EDIT -- run: make generate

# Candidate build inputs adopted from PAPERS.yaml at generation time.
REGISTRY_PAPER_TARGETS := main quantum method synthesis substrate book pov tensor music temporal zsf exp limbic osqft intqft geo gestalt preverbal swarm usf cosconst darkmatter phenomena g2break demo-case lean-appendix omnibus-a4
REGISTRY_PAPER_ROYAL_TARGETS := omnibus-royal
REGISTRY_FRACTAL_PREREQUISITES := 
REGISTRY_FRACTAL_TARGETS := fractal-thesis vol1 vol2 book-gateway book-physics book-neuroscience book-clinical-psychology book-computer-science book-formal-mathematics book-consciousness book-complex-systems book-music-arts book-geophysics book-social-science book-economics book-law book-ppe book-psychiatry-asd

.PHONY: papers papers-royal ttheory zenodo zenodo-papers zenodo-ttheory nlm nlm-papers nlm-ttheory lulu stuff dist

papers: registry-papers
	cp -f $(PAPER)/soma-field-paper.pdf                              $(DIST)/papers/soma-field-paper.pdf
	cp -f $(PAPER)/quantum-soma-penrose.pdf                          $(DIST)/papers/quantum-soma-penrose.pdf
	cp -f $(PAPER)/mathematical-co-identification.pdf                $(DIST)/papers/mathematical-co-identification.pdf
	cp -f $(PAPER)/soma-field-synthesis.pdf                          $(DIST)/papers/soma-field-synthesis.pdf
	cp -f $(PAPER)/soma-physical-substrate.pdf                       $(DIST)/papers/soma-physical-substrate.pdf
	cp -f $(PAPER)/soma-field-book.pdf                               $(DIST)/papers/soma-field-book.pdf
	cp -f $(PAPER)/soma-field-patient-pov.pdf                        $(DIST)/papers/soma-field-patient-pov.pdf
	cp -f $(PAPER)/the-tensor.pdf                                    $(DIST)/papers/the-tensor.pdf
	cp -f $(PAPER)/music-affect-dynamics.pdf                         $(DIST)/papers/music-affect-dynamics.pdf
	cp -f $(PAPER)/soma-temporal-dynamics.pdf                        $(DIST)/papers/soma-temporal-dynamics.pdf
	cp -f $(PAPER)/zoomable-somatic-field.pdf                        $(DIST)/papers/zoomable-somatic-field.pdf
	cp -f $(PAPER)/experimental-validation.pdf                       $(DIST)/papers/experimental-validation.pdf
	cp -f $(PAPER)/missing-limbic-layer.pdf                          $(DIST)/papers/missing-limbic-layer.pdf
	cp -f $(PAPER)/usf-euclidean-qft.pdf                             $(DIST)/papers/P14-usf-euclidean-qft.pdf
	cp -f $(PAPER)/usf-interacting-qft.pdf                           $(DIST)/papers/P15-usf-interacting-qft.pdf
	cp -f $(PAPER)/geographic-somatic-field.pdf                      $(DIST)/papers/geographic-somatic-field.pdf
	cp -f $(PAPER)/gestalt-field-dynamics.pdf                        $(DIST)/papers/gestalt-field-dynamics.pdf
	cp -f $(PAPER)/preverbal-manifold.pdf                            $(DIST)/papers/preverbal-manifold.pdf
	cp -f $(PAPER)/swarm-propagator.pdf                              $(DIST)/papers/swarm-propagator.pdf
	cp -f $(PAPER)/universal-somatic-field.pdf                       $(DIST)/papers/universal-somatic-field.pdf
	cp -f $(PAPER)/cosmological-constant-derivation.pdf              $(DIST)/papers/cosmological-constant-derivation.pdf
	cp -f $(PAPER)/dark-matter-spatial-vacuum.pdf                    $(DIST)/papers/dark-matter-spatial-vacuum.pdf
	cp -f $(PAPER)/ttheory-phenomena.pdf                             $(DIST)/papers/ttheory-phenomena.pdf
	cp -f $(PAPER)/g2-symmetry-breaking.pdf                          $(DIST)/papers/g2-symmetry-breaking.pdf
	cp -f $(PAPER)/SFT-DEMO-CASE.pdf                                 $(DIST)/papers/SFT-DEMO-CASE.pdf
	cp -f $(PAPER)/lean-proofs-appendix.pdf                          $(DIST)/papers/lean-proofs-appendix.pdf
	cp -f $(PAPER)/omnibus-a4.pdf                                    $(DIST)/papers/omnibus-a4.pdf

papers-royal: registry-papers-royal
	cp -f $(PAPER)/omnibus-royal.pdf                                 $(DIST)/papers/omnibus-royal.pdf

ttheory: registry-fractal
	cp -f $(FRAC)/ttheory-omnibus.pdf                                $(DIST)/papers/ttheory-omnibus.pdf
	cp -f $(FRAC)/ttheory-vol1.pdf                                   $(DIST)/papers/ttheory-vol1.pdf
	cp -f $(FRAC)/ttheory-vol2.pdf                                   $(DIST)/papers/ttheory-vol2.pdf
	cp -f $(FRAC)/booklet-gateway.pdf                                $(DIST)/papers/ttheory-cheatsheet.pdf
	cp -f $(FRAC)/book-gateway.pdf                                   $(DIST)/papers/book-gateway.pdf
	cp -f $(FRAC)/book-physics.pdf                                   $(DIST)/papers/book-physics.pdf
	cp -f $(FRAC)/book-neuroscience.pdf                              $(DIST)/papers/book-neuroscience.pdf
	cp -f $(FRAC)/book-clinical-psychology.pdf                       $(DIST)/papers/book-clinical-psychology.pdf
	cp -f $(FRAC)/book-computer-science.pdf                          $(DIST)/papers/book-computer-science.pdf
	cp -f $(FRAC)/book-formal-mathematics.pdf                        $(DIST)/papers/book-formal-mathematics.pdf
	cp -f $(FRAC)/book-consciousness.pdf                             $(DIST)/papers/book-consciousness.pdf
	cp -f $(FRAC)/book-complex-systems.pdf                           $(DIST)/papers/book-complex-systems.pdf
	cp -f $(FRAC)/book-music-arts.pdf                                $(DIST)/papers/book-music-arts.pdf
	cp -f $(FRAC)/book-geophysics.pdf                                $(DIST)/papers/book-geophysics.pdf
	cp -f $(FRAC)/book-social-science.pdf                            $(DIST)/papers/book-social-science.pdf
	cp -f $(FRAC)/book-economics.pdf                                 $(DIST)/papers/book-economics.pdf
	cp -f $(FRAC)/book-law.pdf                                       $(DIST)/papers/book-law.pdf
	cp -f $(FRAC)/book-ppe.pdf                                       $(DIST)/papers/book-ppe.pdf
	cp -f $(FRAC)/book-psychiatry-asd.pdf                            $(DIST)/papers/book-psychiatry-asd.pdf

zenodo-papers: registry-papers
	cp -f $(PAPER)/soma-field-paper.pdf                              $(DIST)/zenodo/P1-soma-field-paper.pdf
	cp -f $(PAPER)/quantum-soma-penrose.pdf                          $(DIST)/zenodo/P2-quantum-soma-penrose.pdf
	cp -f $(PAPER)/mathematical-co-identification.pdf                $(DIST)/zenodo/P3-mathematical-co-identification.pdf
	cp -f $(PAPER)/soma-field-synthesis.pdf                          $(DIST)/zenodo/P4-soma-field-synthesis.pdf
	cp -f $(PAPER)/soma-physical-substrate.pdf                       $(DIST)/zenodo/P5-soma-physical-substrate.pdf
	cp -f $(PAPER)/soma-field-book.pdf                               $(DIST)/zenodo/P6-soma-field-book.pdf
	cp -f $(PAPER)/soma-field-patient-pov.pdf                        $(DIST)/zenodo/P7-soma-field-patient-pov.pdf
	cp -f $(PAPER)/the-tensor.pdf                                    $(DIST)/zenodo/P8-the-tensor.pdf
	cp -f $(PAPER)/music-affect-dynamics.pdf                         $(DIST)/zenodo/P9-music-affect-dynamics.pdf
	cp -f $(PAPER)/soma-temporal-dynamics.pdf                        $(DIST)/zenodo/P10-soma-temporal-dynamics.pdf
	cp -f $(PAPER)/zoomable-somatic-field.pdf                        $(DIST)/zenodo/P11-zoomable-somatic-field.pdf
	cp -f $(PAPER)/experimental-validation.pdf                       $(DIST)/zenodo/P12-experimental-validation.pdf
	cp -f $(PAPER)/missing-limbic-layer.pdf                          $(DIST)/zenodo/P13-missing-limbic-layer.pdf
	cp -f $(PAPER)/usf-euclidean-qft.pdf                             $(DIST)/zenodo/P14-usf-euclidean-qft.pdf
	cp -f $(PAPER)/usf-interacting-qft.pdf                           $(DIST)/zenodo/P15-usf-interacting-qft.pdf
	cp -f $(PAPER)/geographic-somatic-field.pdf                      $(DIST)/zenodo/P16-geographic-somatic-field.pdf
	cp -f $(PAPER)/gestalt-field-dynamics.pdf                        $(DIST)/zenodo/P17-gestalt-field-dynamics.pdf
	cp -f $(PAPER)/preverbal-manifold.pdf                            $(DIST)/zenodo/P18-preverbal-manifold.pdf
	cp -f $(PAPER)/swarm-propagator.pdf                              $(DIST)/zenodo/P19-swarm-propagator.pdf
	cp -f $(PAPER)/universal-somatic-field.pdf                       $(DIST)/zenodo/P20-universal-somatic-field.pdf
	cp -f $(PAPER)/cosmological-constant-derivation.pdf              $(DIST)/zenodo/P21-cosmological-constant-derivation.pdf
	cp -f $(PAPER)/dark-matter-spatial-vacuum.pdf                    $(DIST)/zenodo/P22-dark-matter-spatial-vacuum.pdf
	cp -f $(PAPER)/ttheory-phenomena.pdf                             $(DIST)/zenodo/P23-ttheory-phenomena.pdf
	cp -f $(PAPER)/g2-symmetry-breaking.pdf                          $(DIST)/zenodo/P24-g2-symmetry-breaking.pdf
	cp -f $(PAPER)/omnibus-a4.pdf                                    $(DIST)/zenodo/C1v2-omnibus.pdf

zenodo-ttheory: registry-fractal
	cp -f $(FRAC)/ttheory-omnibus.pdf                                $(DIST)/zenodo/C2-ttheory-fractal-programme.pdf

zenodo: zenodo-papers zenodo-ttheory

nlm-papers: papers
	cp -f $(DIST)/papers/omnibus-a4.pdf                              $(DIST)/nlm-min/01-omnibus-v2.pdf
	cp -f $(DIST)/papers/soma-field-paper.pdf                        $(DIST)/nlm-max/P01-soma-field.pdf
	cp -f $(DIST)/papers/quantum-soma-penrose.pdf                    $(DIST)/nlm-max/P02-quantum-penrose.pdf
	cp -f $(DIST)/papers/mathematical-co-identification.pdf          $(DIST)/nlm-max/P03-mathematical-co-identification.pdf
	cp -f $(DIST)/papers/soma-field-synthesis.pdf                    $(DIST)/nlm-max/P04-synthesis.pdf
	cp -f $(DIST)/papers/soma-physical-substrate.pdf                 $(DIST)/nlm-max/P05-physical-substrate.pdf
	cp -f $(DIST)/papers/soma-field-book.pdf                         $(DIST)/nlm-max/P06-field-book.pdf
	cp -f $(DIST)/papers/soma-field-patient-pov.pdf                  $(DIST)/nlm-max/P07-patient-pov.pdf
	cp -f $(DIST)/papers/the-tensor.pdf                              $(DIST)/nlm-max/P08-the-tensor.pdf
	cp -f $(DIST)/papers/music-affect-dynamics.pdf                   $(DIST)/nlm-max/P09-music-affect.pdf
	cp -f $(DIST)/papers/soma-temporal-dynamics.pdf                  $(DIST)/nlm-max/P10-temporal-dynamics.pdf
	cp -f $(DIST)/papers/zoomable-somatic-field.pdf                  $(DIST)/nlm-max/P11-zoomable-field.pdf
	cp -f $(DIST)/papers/experimental-validation.pdf                 $(DIST)/nlm-max/P12-experimental-validation.pdf
	cp -f $(DIST)/papers/missing-limbic-layer.pdf                    $(DIST)/nlm-max/P13-missing-limbic-layer.pdf
	cp -f $(DIST)/papers/P14-usf-euclidean-qft.pdf                   $(DIST)/nlm-max/P14-euclidean-qft.pdf
	cp -f $(DIST)/papers/P15-usf-interacting-qft.pdf                 $(DIST)/nlm-max/P15-interacting-qft.pdf
	cp -f $(DIST)/papers/geographic-somatic-field.pdf                $(DIST)/nlm-max/P16-geographic-field.pdf
	cp -f $(DIST)/papers/gestalt-field-dynamics.pdf                  $(DIST)/nlm-max/P17-gestalt-dynamics.pdf
	cp -f $(DIST)/papers/preverbal-manifold.pdf                      $(DIST)/nlm-max/P18-preverbal-manifold.pdf
	cp -f $(DIST)/papers/swarm-propagator.pdf                        $(DIST)/nlm-max/P19-swarm-propagator.pdf
	cp -f $(DIST)/papers/universal-somatic-field.pdf                 $(DIST)/nlm-max/P20-universal-somatic-field.pdf
	cp -f $(DIST)/papers/cosmological-constant-derivation.pdf        $(DIST)/nlm-max/P21-cosmological-constant.pdf
	cp -f $(DIST)/papers/dark-matter-spatial-vacuum.pdf              $(DIST)/nlm-max/P22-dark-matter-spatial-vacuum.pdf
	cp -f $(DIST)/papers/ttheory-phenomena.pdf                       $(DIST)/nlm-max/P23-ttheory-phenomena.pdf
	cp -f $(DIST)/papers/g2-symmetry-breaking.pdf                    $(DIST)/nlm-max/P24-g2-symmetry-breaking.pdf
	cp -f $(DIST)/papers/lean-proofs-appendix.pdf                    $(DIST)/nlm-max/05-lean-proofs-appendix.pdf
	cp -f $(DIST)/papers/omnibus-a4.pdf                              $(DIST)/nlm-max/01-omnibus-v2.pdf

nlm-ttheory: ttheory
	cp -f $(DIST)/papers/ttheory-omnibus.pdf                         $(DIST)/nlm-min/02-ttheory-fractal-programme.pdf
	cp -f $(DIST)/papers/ttheory-omnibus.pdf                         $(DIST)/nlm-max/02-fractal-programme.pdf
	cp -f $(DIST)/papers/ttheory-vol1.pdf                            $(DIST)/nlm-max/03-fractal-vol1-foundation.pdf
	cp -f $(DIST)/papers/ttheory-vol2.pdf                            $(DIST)/nlm-max/04-fractal-vol2-application.pdf
	cp -f $(DIST)/papers/ttheory-cheatsheet.pdf                      $(DIST)/nlm-max/cheatsheet.pdf
	cp -f $(DIST)/PROMPTS.md                                         $(DIST)/nlm-max/PROMPTS.md

nlm: nlm-papers nlm-ttheory

lulu: registry-fractal
	cp -f $(PAPER)/omnibus-a4.pdf                                    $(DIST)/lulu/01-omnibus-v2.pdf
	cp -f $(FRAC)/ttheory-vol1.pdf                                   $(DIST)/lulu/03-ttheory-vol1-foundation.pdf
	cp -f $(FRAC)/ttheory-vol2.pdf                                   $(DIST)/lulu/04-ttheory-vol2-application.pdf
	cp -f $(FRAC)/book-gateway.pdf                                   $(DIST)/lulu/ttheory-book-gateway.pdf
	cp -f $(FRAC)/book-physics.pdf                                   $(DIST)/lulu/ttheory-book-physics.pdf
	cp -f $(FRAC)/book-neuroscience.pdf                              $(DIST)/lulu/ttheory-book-neuroscience.pdf
	cp -f $(FRAC)/book-clinical-psychology.pdf                       $(DIST)/lulu/ttheory-book-clinical-psychology.pdf
	cp -f $(FRAC)/book-computer-science.pdf                          $(DIST)/lulu/ttheory-book-computer-science.pdf
	cp -f $(FRAC)/book-formal-mathematics.pdf                        $(DIST)/lulu/ttheory-book-formal-mathematics.pdf
	cp -f $(FRAC)/book-consciousness.pdf                             $(DIST)/lulu/ttheory-book-consciousness.pdf
	cp -f $(FRAC)/book-complex-systems.pdf                           $(DIST)/lulu/ttheory-book-complex-systems.pdf
	cp -f $(FRAC)/book-music-arts.pdf                                $(DIST)/lulu/ttheory-book-music-arts.pdf
	cp -f $(FRAC)/book-geophysics.pdf                                $(DIST)/lulu/ttheory-book-geophysics.pdf
	cp -f $(FRAC)/book-social-science.pdf                            $(DIST)/lulu/ttheory-book-social-science.pdf
	cp -f $(FRAC)/book-economics.pdf                                 $(DIST)/lulu/ttheory-book-economics.pdf
	cp -f $(FRAC)/book-law.pdf                                       $(DIST)/lulu/ttheory-book-law.pdf
	cp -f $(FRAC)/book-ppe.pdf                                       $(DIST)/lulu/ttheory-book-ppe.pdf
	cp -f $(FRAC)/book-psychiatry-asd.pdf                            $(DIST)/lulu/ttheory-book-psychiatry-asd.pdf

stuff: registry-fractal
	cp -f $(FRAC)/booklet-gateway.pdf                                $(DIST)/stuff/ttheory-cheatsheet.pdf

dist: papers ttheory zenodo nlm lulu stuff nlm-uat

nlm-uat: papers ttheory
	cp -f $(DIST)/papers/omnibus-a4.pdf                              $(DIST)/nlm-uat/C1v2-omnibus-v2-AFTER.pdf
	cp -f $(DIST)/papers/ttheory-omnibus.pdf                         $(DIST)/nlm-uat/C2-fractal-thesis-AFTER.pdf
